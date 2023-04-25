import { FieldErrors, FieldValues } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type FieldProps = {
  htmlFor: keyof FieldValues;
  fieldLabel: string;
  errors: FieldErrors<any>;
  children: React.ReactNode;
}; // uncontrolled input

const FormField = ({ htmlFor, fieldLabel, errors, children }: FieldProps) => {
  let registerOptions = {
    required: true,
    // valueAsNumber: type === "number" ? true : undefined,
  } as {
    required: boolean;
    valueAsNumber?: true | undefined;
  };

  //uncontrolled input : just register, controlled input: onChange and onBlur

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

      {children}
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
      className={`font-medium text-sm text-gray-600 ${className || ""}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
