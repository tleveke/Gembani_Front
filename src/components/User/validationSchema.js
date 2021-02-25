import * as Yup from 'yup';

export default Yup.object({
  userType: Yup.string('Enter the user type').required(
    'A user is either a client or an employee'
  ),

  emails: Yup.array().of(
    Yup.string().email(({ value }) => `${value} is not a valid email`)
  ),

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
