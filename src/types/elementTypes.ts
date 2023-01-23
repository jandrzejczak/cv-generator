export interface BaseElementPropertiesType {
  w: number;
  h: number;
  resizable: boolean;
  type: string;
}

export interface BaseElementDataType {
  header?: string;
  text?: string;
  date?: string;
}

export interface BaseElementType extends BaseElementPropertiesType {
  data?: BaseElementDataType;
  id?: number,
  layout_name?: string,
  i: number;
  x: number;
  y: number;
}
