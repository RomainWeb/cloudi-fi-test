export interface FormConfigInterface {
  label: string;
  type: 'text' | 'address';
  placeholder?: string;
  options?: FormConfigOptionsInterface;
}

interface FormConfigOptionsInterface {
  placeholder?: string;
  length?: number;
  valueType?: string;
}
