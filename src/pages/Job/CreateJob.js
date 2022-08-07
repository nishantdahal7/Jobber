import { getAuth } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { Field, Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useDatabase } from '../../contexts/DatabaseContext'

export const CreateJob = () => {
  const { db } = useDatabase()
  const { currentUser } = getAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const textRef = useRef()
  //TODO: CUSTOMIZE THIS PAGE
  // TODO: FORCE NAVIGATE USER TO DASHBOARD IF THE IS ON BOARDING VALUE IS TRUE

  return (
    <>
      <Formik
        initialValues={{
          jobTitle: '',
          jobDescription: '',
          payRole: 'Project Based',
          payRate: '',
          payCurrency: '',
          engagementType: 'Part Time',
          skills: '',
        }}
        onSubmit={async (values) => {
          try {
            const { skills, ...defaultValues } = values
            setIsLoading(true)
            const jobId = v4()
            const jobRef = doc(db, 'job', jobId)
            setDoc(jobRef, {
              ...defaultValues,
              jobId,
              userId: currentUser.uid,
              skills: skills.split(','),
            })
            navigate('/dashboard')
          } catch (err) {
            //TODO: store the error in state and display in UI
            console.log('ERR', err)
          } finally {
            setIsLoading(false)
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div class='screen'>
              <div class='screen__content'>
                <form class='signupContainer'>
                  <div class='login__field'>
                    <i class='login__icon fas fa-user'></i>

                    <Field
                      as='select'
                      id='jobTitle'
                      name='jobTitle'
                      class='login__input'
                      ref={textRef}
                      required
                    >
                      <option>Job Title?</option>
                      <option value='Full Stack Web Developer'>
                        Full Stack Web Developer
                      </option>
                      <option value='Front End Developer'>
                        Front End Developer
                      </option>
                      <option value='Backend Engineer'>Backend Engineer</option>
                      <option value='Data Analyst'>Data Analyst</option>
                      <option value='Cloud Computing Engineer'>
                        Cloud Computing Engineer
                      </option>
                      <option value='Computer Network Specialist'>
                        Computer Network Specialist
                      </option>
                      <option value='Database Administrator'>
                        Database Administrator
                      </option>
                      <option value='Cloud Computing Engineer'>
                        Cloud Computing Engineer
                      </option>
                      <option value='Computer Network Specialist'>
                        Computer Network Specialist
                      </option>
                      <option value='Database Administrator'>
                        Database Administrator
                      </option>
                    </Field>
                  </div>
                  <div class='login__field'>
                    <i class='login__icon fas fa-user'></i>
                    <Field
                      id='jobDescription'
                      name='jobDescription'
                      class='login__input'
                      placeholder='Job Description......?'
                      ref={textRef}
                      required
                    />
                  </div>
                  <br />
                  <div role='group' aria-labelledby='buyer-radio-group'>
                    <div role='group' aria-labelledby='payrole-radio-group'>
                      <label>
                        <Field type='radio' name='payRole' value='Hourly' />
                        Hourly &nbsp;
                      </label>
                      <label>
                        <Field
                          type='radio'
                          name='payRole'
                          value='Project Based'
                        />
                        Project Based
                      </label>
                    </div>
                  </div>
                  <br />
                  <div role='group' aria-labelledby='buyer-radio-group'>
                    <label>
                      <Field
                        type='radio'
                        name='engagementType'
                        value='Full Time'
                      />
                      Full Time &nbsp;
                    </label>
                    <label>
                      <Field
                        type='radio'
                        name='engagementType'
                        value='Part Time'
                      />
                      Part Time
                    </label>
                  </div>
                  <br />
                  <div class='login__field'>
                    <i class='login__icon fas fa-user'></i>

                    <Field
                      as='select'
                      name='payCurrency'
                      class='login__input'
                      placeholder='Job Description......?'
                      required
                    >
                      <option>Select currency</option>
                      <option value='NRP'>NPR</option>
                      <option value='USD'>USD</option>
                      <option value='USED'>UED</option>
                    </Field>
                  </div>

                  <div class='login__field'>
                    <i class='login__icon fas fa-user'></i>
                    <Field
                      id='payRate'
                      name='payRate'
                      class='login__input'
                      placeholder='Pay Rate'
                      required
                    />
                  </div>
                  <div class='login__field'>
                    <i class='login__icon fas fa-user'></i>
                    <Field
                      id='skills'
                      name='skills'
                      class='login__input'
                      placeholder='Skills'
                      required
                    />
                  </div>
                </form>
              </div>

              <div class='screen__background'>
                <span class='screen__background__shape screen__background__shape4'></span>
                <span class='screen__background__shape screen__background__shape3'></span>
                <span class='screen__background__shape screen__background__shape2'></span>
                <span class='screen__background__shape screen__background__shape1'></span>
              </div>
            </div>

            <button type='submit' class='button login__submit'>
              <span class='button__text'>Submit</span>
            </button>

            <br />
            {/* {JSON.stringify(values, null, 4)} */}
          </Form>
        )}
      </Formik>
    </>
  )
}
