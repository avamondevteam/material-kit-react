import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [regstatus, setRegStatus] = useState(false)
  const RegisterSchema = Yup.object().shape({

    fullName: Yup.string().required('Bạn phải điền họ tên'),
    phone: Yup.string().required('Bạn phải điền số điện thoại'),
    password: Yup.string().required('Bạn phải điền mật khẩu'),
    re_password: Yup.string().required('Xác nhận lại mật khẩu'),

  });

  const defaultValues = {
    fullName: '',
    phone: '',
    password: '',
    re_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };
  const [valfullname, setFullName] = useState("")
  const [valphone, setPhone] = useState("")
  const [valpassword, setPassword] = useState("")
  const [valrepassword, setRePassword] = useState("")
  const [passwderror, setPasswdError] = useState("")
  const [lengthpasswderror, setLengthPasswdError] = useState("")
  const [fullnameerror, setFullNameError] = useState("")
  const [phoneerror, setPhoneError] = useState("")

  const submitForm = () =>{
    
    if (valpassword === valrepassword && valpassword.length >=8){
      axios({
        method:'post',
        url: 'http://localhost:8888/api/register',
        data: { "phone": valphone, "fullname":valfullname ,"passwd": valpassword }
      }).then(res => {
        if (res.data.etype === 'fullname'){
          setFullNameError(res.data.message)
        }
        if (res.data.etype === 'phone'){
          setPhoneError(res.data.message)
        }
        if (res.data.status === true){
          setRegStatus(true)
          setTimeout(() => {
            return navigate('/login', { replace: true });
          }, 1500);
          
        }
      })
    }
    else if (valpassword !== valrepassword ){
      setPasswdError("Xác nhận mật khẩu không chính xác")
    }
    else if (valpassword.replace(' ', '').length< 8 ){
      setLengthPasswdError("Mật khẩu phải dài hơn 8 chữ số")
    }
    
  }

  return (
    <FormProvider methods={methods}>      
      <Stack spacing={3}>
        {regstatus && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            Đăng kí thành công
          </Alert>
        </Stack>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {fullnameerror !== "" ? <TextField sx={{ label: { color: 'red' } }} onChange={(e)=>setFullName(e.target.value)} onClick={()=>setFullNameError("")} name="fullName" label={fullnameerror} />:
          <TextField onChange={(e)=>setFullName(e.target.value)} onClick={()=>setFullNameError("")} name="fullName" label="Họ và tên" />}
        </Stack>
        {phoneerror !== "" ? <TextField sx={{ label: { color: 'red' } }} onClick={()=>setPhoneError("")} onChange={(e)=>setPhone(e.target.value)} name="phone" label={phoneerror} />:
        <TextField onClick={()=>setPhoneError("")} onChange={(e)=>setPhone(e.target.value)} name="phone" label="Số điện thoại" />}

        {lengthpasswderror !==""? <TextField
          name="password"
          label={lengthpasswderror}
          sx={{ label: { color: 'red' } }}
          onClick={()=>setLengthPasswdError("")}
          onChange={(e)=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />:
        <TextField
          name="password"
          label="Mật khẩu"
          onChange={(e)=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />}



        {passwderror !== "" ? <TextField
          name="re_password"
          label={passwderror}
          sx={{ label: { color: 'red' } }}
          onChange={(e)=>setRePassword(e.target.value)}
          onClick={()=>setPasswdError("")}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />: 
        <TextField
          name="re_password"
          label="Xác nhận Mật khẩu"
          onChange={(e)=>setRePassword(e.target.value)}
          onClick={()=>setPasswdError("")}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />}

        <LoadingButton fullWidth size="large" type="button" onClick={()=>submitForm()} variant="contained" loading={isSubmitting}>
          Đăng kí
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
