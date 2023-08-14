import { Field } from "formik";

export default function TypeOfAccountSelect() {
  return (
    <div className="reg_grid">
      <label htmlFor="company">
        Company{" "}
        <Field type="radio" name="accountType" id="company" value="company" />
      </label>
      <label htmlFor="personal">
        Personal{" "}
        <Field type="radio" name="accountType" id="personal" value="personal" />
      </label>
    </div>
  );
}
