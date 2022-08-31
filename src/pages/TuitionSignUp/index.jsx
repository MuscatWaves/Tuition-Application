import React from "react";
import Footer from "../../components/Footer";
import TopNavigation from "../../components/TopNavigation";
import { useForm } from "@mantine/form";
import { Select, MultiSelect } from "@mantine/core";
import "./tuitionSignUp.css";

const TuitionSignUp = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      subjects: [],
    },
  });

  //   () =>
  //   form.setValues({
  //     ...form.values,
  //     subjects: [],
  //   })

  return (
    <div>
      <TopNavigation />
      <div className="tuitionSignUp-wrapper-body">
        <div className="tuitionSignUp-body">
          <div>Tuition</div>
          <div>
            For face-to-face and online tuition contact us on (Phone Number)
          </div>
          <form
            onSubmit={form.onSubmit((values) => console.log(values))}
            className="tuitionSignUp-form"
          >
            <div>
              <div>First Name</div>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your first name"
                  {...form.getInputProps("first_name")}
                  required
                />
              </div>
            </div>
            <div>
              <div>Last Name</div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your last name"
                {...form.getInputProps("last_name")}
                required
              />
            </div>
            <div>
              <div>Country</div>
              <Select
                placeholder="Select your country"
                data={[
                  { label: "Grades", value: 1 },
                  { label: "Subjects", value: 2 },
                  { label: "Services", value: 3 },
                ]}
                radius="xl"
                size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("country")}
              />
            </div>
            <div>
              <div>Email</div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your email"
                {...form.getInputProps("email")}
                required
              />
            </div>
            <div>
              <div>Password</div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
                required
              />
            </div>
            <div>
              <div>Grades</div>
              <Select
                placeholder="Select your country"
                data={[
                  { label: "Grades", value: 1 },
                  { label: "Subjects", value: 2 },
                  { label: "Services", value: 3 },
                ]}
                radius="xl"
                size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("grades")}
              />
            </div>
            <div style={{ gridColumn: "1/3" }}>
              <div>Subjects</div>
              <MultiSelect
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                  { value: "riot", label: "Riot" },
                  { value: "next", label: "Next.js" },
                  { value: "blitz", label: "Blitz.js" },
                ]}
                placeholder="Pick all that you like"
                radius="xl"
                size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("subjects")}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TuitionSignUp;
