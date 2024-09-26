import { isEmpty } from "lodash";

export default function AdditionInformation({
  additionInformationFields,
  additionInformation,
  setAdditionInformation,
}) {
  return (
    !isEmpty(additionInformationFields) && (
      <div className="note row mt-3">
        {additionInformationFields.map((field, index) => {
          const fieldComponent = field.component;
          const fieldProps = { ...field };
          delete fieldProps.component;
          return (
            <div className="col-xl-6 col-md-12" key={index}>
              <fieldComponent.component
                {...fieldProps}
                value={additionInformation?.[field.name]}
                onChange={(e) =>
                  setAdditionInformation({
                    ...additionInformation,
                    [field.name]: e.target.value,
                  })
                }
              />
            </div>
          );
        })}
      </div>
    )
  );
}
