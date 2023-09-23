import * as TJS from "typescript-json-schema";

export function generateSchema(classFullPath: string, className: string) {
  const program = TJS.getProgramFromFiles([classFullPath]);

  const schema = TJS.generateSchema(program, className, {
    required: true,
  });

  if (!schema) {
    throw new Error(`Failed to generate schema for ${className}`);
  }

  return schema;
}
