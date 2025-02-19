'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  console.log('receve data: ', data);
  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = (nodes: TreeNode) => {
    const allIds = new Set<string>();

    // const traverse = (nodes: TreeNode[]) => {
    //   nodes.forEach((node) => {
    //     allIds.add(node.id);
    //     if (node.children && node.children.length > 0) {
    //       traverse(node.children);
    //     }
    //   });
    // };
    const traverse = (node: TreeNode) => {
      allIds.add(node.id);
      if (node.children && node.children.length > 0) {
        node.children.forEach(traverse);
      }
    };

    traverse(nodes);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const renderTree = (nodes: TreeNode[]) => {
    return nodes?.map((node) => (
      <div
        key={node.id}
        role="treeitem"
        aria-expanded={expandedNodes.has(node.id)}
      >
        <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
          <button
            className={`${node.children?.length === 0 && 'hidden'} hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700`}
            onClick={() => toggleNode(node.id)}
            aria-expanded={expandedNodes.has(node.id)}
          >
            {node.children &&
              node.children.length > 0 &&
              (expandedNodes.has(node.id) ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronUp size={14} />
              ))}
          </button>

          <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
            <div className="flex items-center gap-x-3">
              <div className="grow">
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  {node.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {node.children && expandedNodes.has(node.id) && (
          <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
            <div className="ms-6 ps-3 relative">
              {/* Render vertical line only if the node has children */}
              {node.children.length > 0 && (
                <div className="absolute top-0 left-[-12px] w-[1px] h-full bg-gray-300 dark:bg-neutral-700"></div>
              )}

              {/* Render children */}
              {node?.children?.map((childNode, index) => (
                <div key={childNode.id} className="flex items-start relative">
                  {/* Horizontal line for child nodes */}
                  {index > 0 && (
                    <div className="absolute top-1/2 left-[-10px] w-6 h-[1px] bg-gray-300 dark:bg-neutral-700"></div>
                  )}
                  <div className="grow">{renderTree([childNode])}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ));
  };

  const handleForm = (id) => {
    console.log('tree parent ID: ', id);
  };

  const TreeNodeComponent = ({ node, expandedNodes, toggleNode }) => {
    return (
      <div
        key={node?.id}
        role="treeitem"
        aria-expanded={expandedNodes.has(node.id)}
      >
        <div className="relative hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-fit group">
          <button
            className={`${node?.children?.length === 0 && 'hidden'} hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700`}
            onClick={() => toggleNode(node.id)}
            aria-expanded={expandedNodes.has(node.id)}
          >
            {node.children &&
              node?.children?.length > 0 &&
              (expandedNodes.has(node.id) ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronUp size={14} />
              ))}
          </button>

          <div
            className={`${node?.children?.length === 0 && 'ms-4'} grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer`}
          >
            <span className="text-sm text-gray-800 dark:text-neutral-200">
              {node.label}
            </span>
          </div>

          <div className="absolute -right-5 top-1.5 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={() => handleForm(node.id)}
              className="bg-indigo-600 rounded-full size-5 flex justify-center items-center"
            >
              <Plus size={12} color="white" />
            </button>
          </div>
        </div>

        {node?.children && expandedNodes?.has(node.id) && (
          <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
            <div className="ms-3 ps-3 relative">
              {/* Vertical line */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-100 dark:bg-neutral-700"></div>

              {node?.children?.map((childNode, index) => (
                <div key={childNode.id} className="flex items-start relative">
                  {/* Horizontal line for each child */}
                  {index > 0 && (
                    <div className="absolute top-1/2 left-[-10px] w-4 h-0.5 bg-gray-100 dark:bg-neutral-700"></div>
                  )}
                  <div className="grow">
                    <TreeNodeComponent
                      node={childNode}
                      expandedNodes={expandedNodes}
                      toggleNode={toggleNode}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="hs-accordion-treeview-root"
      role="tree"
      aria-orientation="vertical"
    >
      <div className="mb-4 flex justify-start my-7 gap-4">
        <button
          className="md:px-8 px-2 py-0 md:text-sm text-xs rounded-full bg-black text-white"
          onClick={() => expandAll(data)}
        >
          Expand All
        </button>
        <button
          className="md:px-6 px-2 py-2 border rounded-full bg-transparent text-black"
          onClick={collapseAll}
        >
          Collapse All
        </button>
      </div>

      <div
        className="hs-accordion-group"
        role="group"
        data-hs-accordion-always-open=""
      >
        {/* {renderTree(data)} */}
        {data && (
          <TreeNodeComponent
            key={data?.id}
            node={data}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        )}
      </div>
    </div>
  );
};

export default TreeView;
