'use client';

import { Suspense, useEffect, useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import TreeView from '../components/TreeView';
import { FormProvider, useForm } from 'react-hook-form';
import CustomProvider from '../components/form/CustomProvider';
import CustomSelect from '../components/form/CustomSelect';
import CustomInput from '../components/form/CustomInput';
import CustomToggle from '../components/form/CustomToggle';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuSchemaValidation, MenuType } from '../utils/schema.validation';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMenu, fetchMenuData, fetchMenuDataById } from '../store/apiSlice';
import { RootState } from '../store';

const treeData: TreeNode[] = [
  {
    id: '1',
    label: 'System Management',
    children: [
      {
        id: '1.1',
        label: 'Systems',
        children: [
          {
            id: '1.1.1',
            label: 'System Code',
            children: [
              {
                id: '1.1.1.1',
                label: 'Code Registration',
                children: [],
              },
            ],
          },
          {
            id: '1.1.2',
            label: 'Code Registeration 2',
            children: [],
          },
          {
            id: '1.1.3',
            label: 'Properties',
            children: [],
          },
          {
            id: '1.1.4',
            label: 'Menus',
            children: [
              {
                id: '1.1.3.1',
                label: 'Menu Registration',
                children: [],
              },
            ],
          },
          {
            id: '1.1.5',
            label: 'APIList',
            children: [
              {
                id: '1.1.5.1',
                label: 'API Registration',
                children: [],
              },
              {
                id: '1.1.5.2',
                label: 'API Edit',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '1.2',
        label: 'API List',
        children: [
          {
            id: '1.2.1',
            label: 'API Registration',
            children: [],
          },
          {
            id: '1.2.2',
            label: 'API Edit',
            children: [],
          },
        ],
      },
      {
        id: '1.3',
        label: 'Users & Groups',
        children: [
          {
            id: '1.3.1',
            label: 'Users',
            children: [
              {
                id: '1.3.1.1',
                label: 'User Account Registration',
                children: [],
              },
            ],
          },
          {
            id: '1.3.2',
            label: 'Groups',
            children: [
              {
                id: '1.3.2.1',
                label: 'User Group Registration',
                children: [],
              },
            ],
          },
          {
            id: '1.3.3',
            label: '사용자 승인',
            children: [],
          },
        ],
      },
    ],
  },
];

const RootPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const methods = useForm();
  const newMethods = useForm<MenuType>({
    mode: 'all',
    resolver: zodResolver(MenuSchemaValidation),
  });

  //watch selected menu value
  const watchSelectedMenu = methods.watch('menu');

  //fetch data from store state
  const { data, loading, error, selectedMenuNode } = useSelector((state: RootState) => state.api);
  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleNewMenu = (data: any) => {
    console.log('new menu data: ', data);
    if (!data.hasParent) {
      data.parentId = null;
    }
    // @ts-ignore
    dispatch(createNewMenu(data));
    handleCloseModal();
  };

  const handleSelect = (selectID: any) => {
    console.log(selectID);
    // @ts-ignore
    dispatch(fetchMenuDataById(selectID));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    newMethods.reset();
  };

  useEffect(() => {
    console.log('fetching api data...', data);
    //@ts-ignore
    dispatch(fetchMenuData());
  }, [dispatch]);

  useEffect(() => {
    if(!["Choose a Menu", undefined].includes(watchSelectedMenu)){
      handleSelect(watchSelectedMenu);
    }
  },[watchSelectedMenu]);

  const renderMenuItems = () => {
    return (
      <div className="w-full">
        <FormProvider {...methods}>
          <CustomProvider handleFormSubmit={methods.handleSubmit(handleSelect)}>
            <CustomSelect
              key={'menu-option'}
              label="Menu"
              name="menu"
              options={data?.map((i) => {
                return {
                  name: i?.label,
                  value: i?.id,
                };
              })}
            />
          </CustomProvider>
        </FormProvider>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-blue-600 p-2">
          <Menu className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-2xl font-semibold">Menus</h1>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full">
        <div className="w-full col-span-2 rounded-lg border-0 p-4">
          <div className="mt-4">
            {renderMenuItems()}

            {selectedMenuNode && <TreeView data={selectedMenuNode} />}
          </div>
        </div>
        <div className="w-full rounded-lg border-0 p-4">form</div>
      </div>

      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setOpenModal(true)}
          className="py-2.5 px-5 me-2 mb-2 flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Plus /> New Menu
        </button>
      </div>

      {openModal && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto bg-black/20 drop-shadow-md backdrop-blur-sm flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-2xl shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Menu
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <FormProvider {...newMethods}>
                <CustomProvider
                  handleFormSubmit={newMethods.handleSubmit(handleNewMenu)}
                >
                  <div className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <CustomInput
                        key={'menu'}
                        name="label"
                        label="Menu Name"
                        placeholder="Enter menu name"
                      />
                      <CustomToggle
                        key={'toggle'}
                        name="hasParent"
                        label="Has parent"
                      />
                      <div className="col-span-2">
                        <CustomSelect
                          key={'select'}
                          options={data?.map((i) => {
                            return {
                              name: i?.label,
                              value: i?.id,
                            };
                          })}
                          name="parentId"
                          label="Parent"
                          disabled={!newMethods.watch('hasParent')}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={
                        !newMethods.formState.isValid ||
                        newMethods.formState.isSubmitting
                      }
                      className="text-white w-full inline-flex items-center justify-center mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-55 disabled:pointer-events-none disabled:cursor-not-allowed"
                    >
                      <Plus size={14} color="white" />
                      Add new Menu
                    </button>
                  </div>
                </CustomProvider>
              </FormProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RootPage;
