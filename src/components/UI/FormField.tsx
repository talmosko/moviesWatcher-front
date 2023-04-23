import { ChangeEventHandler } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type FieldProps =
  | {
      htmlFor: keyof FieldValues;
      fieldLabel: string;
      type?: string;
      register?: undefined;
      onBlur: ChangeEventHandler;
      onChange: ChangeEventHandler;
      value: any;
      errors: FieldErrors<any>;
    } // controlled input
  | {
      htmlFor: keyof FieldValues;
      fieldLabel: string;
      type?: string;
      register: UseFormRegister<any>;
      onBlur?: undefined;
      onChange?: undefined;
      value?: undefined;
      errors: FieldErrors<any>;
    }; // uncontrolled input

const FormField = ({
  htmlFor,
  fieldLabel,
  type = "text",
  onBlur = undefined,
  onChange = undefined,
  register = undefined,
  value = undefined,
  errors,
}: FieldProps) => {
  const isControlledInput = !register;
  let registerOptions = {
    required: true,
    valueAsNumber: type === "number" ? true : undefined,
  } as
    | {
        required: boolean;
        valueAsNumber?: true | undefined;
        valueAsDate?: undefined;
      }
    | {
        required: boolean;
        valueAsNumber?: undefined;
        valueAsDate?: true | undefined;
      };

  //uncontrolled input : just register, controlled input: onChange and onBlur
  let inputAttributes: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > = !isControlledInput
    ? { ...register(htmlFor, registerOptions) }
    : { onChange, onBlur, value };
  return (
    <div className="w-72 sm:w-80 grid grid-cols-2 grid-rows-2">
      <FieldLabel
        className="self-center col-start-1 col-end-2 row-start-1 "
        htmlFor={htmlFor}
      >
        {fieldLabel}
      </FieldLabel>
      {errors[htmlFor] && (
        <ErrorMessage className="self-center justify-self-end col-start-2 col-end-3 row-start-1">
          {errors[htmlFor]!.message as string}
        </ErrorMessage>
      )}

      <input
        className="border p-2 rounded-md col-start-1 col-end-3 row-start-2 w-72 sm:w-80 h-8 border-blue-800 text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
        type={type}
        {...inputAttributes}
      />
    </div>
  );
};

export default FormField;

export const FieldLabel = ({
  htmlFor,
  children,
  className,
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) => {
  return (
    <label
      className={`font-medium text-xs text-gray-600 ${className || ""}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
