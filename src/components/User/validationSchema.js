import * as Yup from 'yup';

export default Yup.object({
  userType: Yup.string('Enter the user type').required(
    'A user is either a client or an employee'
  ),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('email is required'),

  hourlyRate: Yup.string().when('userType', {
    is: 'employee',
    then: Yup.string().required(),
    otherwise: Yup.string()
  }),
  company: Yup.string().when('userType', {
    is: 'client',
    then: Yup.string().required(),
    otherwise: Yup.string()
  })
});
