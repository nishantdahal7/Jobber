import { getAuth } from "@firebase/auth";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";

export const OnBoarding = () => {
  const { db } = useDatabase();
  const { currentUser } = getAuth();
  const { setUserData, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //TODO: CUSTOMIZE THIS PAGE
  //TODO: FORCE NAVIGATE USER TO DASHBOARD IF THE IS ON BOARDING VALUE IS TRUE :D
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userType: "Buyer",
          payRate: "",
          payCurrency: "NPR",
          engagementType: "Part Time",
          skills: "",
        }}
        onSubmit={async (values) => {
          try {
            const { skills, ...defaultValues } = values;
            setIsLoading(true);
            const userRef = doc(db, "user", currentUser.uid);
            const updatedDoc = await updateDoc(userRef, {
              isOnBoarded: true,
              ...defaultValues,
              skills: skills.split(","),
            });
            setUserData((await getDoc(userRef)).data());

            navigate("/dashboard");
          } catch (err) {
            //TODO: store the error in state and display in UI
            console.log("ERR", err);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div class="screen">
              <div class="screen__content">
                <form class="signupContainer">
                  <div class="login__field">
                    <i class="login__icon fas fa-user"></i>
                    <Field
                      id="firstName"
                      name="firstName"
                      class="login__input"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div class="login__field">
                    <i class="login__icon fas fa-user"></i>
                    <Field
                      id="lastName"
                      name="lastName"
                      class="login__input"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <br />
                  <div role="group" aria-labelledby="buyer-radio-group">
                    <label>
                      <Field type="radio" name="userType" value="Buyer" />
                      Buyer &nbsp;
                    </label>
                    <label>
                      <Field type="radio" name="userType" value="Provider" />
                      Provider
                    </label>
                  </div>
                  <br />
                  <div role="group" aria-labelledby="buyer-radio-group">
                    <label>
                      <Field
                        type="radio"
                        name="engagementType"
                        value="Full Time"
                      />
                      Full Time
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="engagementType"
                        value="Part Time"
                      />
                      Part Time
                    </label>
                  </div>
                  <br />
                  <Field as="select" name="payCurrency">
                    <option value="NRP">NPR</option>
                    <option value="USD">USD</option>
                    <option value="USED">UED</option>
                  </Field>

                  <div class="login__field">
                    <i class="login__icon fas fa-user"></i>
                    <Field
                      id="payRate"
                      name="payRate"
                      class="login__input"
                      placeholder="Pay Rate"
                      required
                    />
                  </div>
                  <div class="login__field">
                    <i class="login__icon fas fa-user"></i>
                    <Field
                      id="skills"
                      name="skills"
                      class="login__input"
                      placeholder="Skills"
                      required
                    />
                  </div>
                </form>
              </div>
              <div class="screen__background">
                <span class="screen__background__shape screen__background__shape4"></span>
                <span class="screen__background__shape screen__background__shape3"></span>
                <span class="screen__background__shape screen__background__shape2"></span>
                <span class="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>

            <button type="submit" class="button login__submit">
              <span class="button__text">Submit</span>
            </button>
            <br />
          </Form>
        )}
      </Formik>
    </>
  );
};
