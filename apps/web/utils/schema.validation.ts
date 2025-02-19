import { z } from 'zod';

export const MenuSchemaValidation = z
  .object({
    label: z.string(),
    parentId: z.string().optional(),
    hasParent: z.boolean().optional(),
  })
  .refine(
    (data) =>
      !data.hasParent || (data.hasParent && data.parentId !== undefined),
    {
      message: 'parentId is required when hasParent is true',
      path: ['parentId'],
    },
  );

export type MenuType = z.infer<typeof MenuSchemaValidation>;
