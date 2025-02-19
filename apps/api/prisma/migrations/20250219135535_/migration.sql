-- CreateTable
CREATE TABLE "TreeNode" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "TreeNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "TreeNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
