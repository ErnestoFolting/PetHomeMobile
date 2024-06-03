import * as Yup from "yup";

const createAdvertSchema = Yup.object().shape({
  name: Yup.string()
    .required("Назва оголошення є обовʼязковою")
    .min(5, "Назва повинна мати щонайменше 5 символів"),
  description: Yup.string()
    .required("Опис оголошення є обовʼязковим")
    .min(10, "Опис повинен мати щонайменше 10 символів")
    .max(500, "Опис повинен мати не більше 500 символів"),
  cost: Yup.number()
    .required("Вартість є обовʼязковою")
    .positive("Вартість повинна бути додатнім числом")
    .typeError("Вартість повинна бути числом"),
  location: Yup.string().required("Локація є обовʼязковою"),
  locationLat: Yup.string()
    .required("Географічна широта є обовʼязковою"),
  locationLng: Yup.string()
    .required("Географічна довгота є обовʼязковою"),
  startTime: Yup.date()
    .required("Дата початку є обовʼязковою")
    .when("endTime", (endTime, schema) => {
      if (endTime) {
        return schema.max(endTime, "Дата початку має бути раніше за дату закінчення оголошення.");
      }
      return schema;
    }),
  endTime: Yup.date().required("Дата закінчення є обовʼязковою"),
});

export default createAdvertSchema