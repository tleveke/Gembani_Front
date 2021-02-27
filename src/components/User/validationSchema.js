import * as Yup from 'yup';

export default Yup.object({
  userType: Yup.string('Enter the user type').required(
    'A user is either a client or an employee'
  ),

  email: Yup.string().email(({ value }) => `${value} is not a valid email`),
  secondaryEmails: Yup.array().of(
    Yup.string()
      .required('Alternative emails cannot be blank')
      .email(({ value }) => `${value} is not a valid email`)
  ),

  hourlyRate: Yup.string().when('userType', {
    is: 'employee',
    then: Yup.string().required(),
    otherwise: Yup.string()
  }),
  companyId: Yup.string().when('userType', {
    is: 'client',
    then: Yup.string().required(),
    otherwise: Yup.string()
  })
});
