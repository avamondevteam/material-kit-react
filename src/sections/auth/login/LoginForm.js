import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import Alert from '@mui/material/Alert';

// @ts-ignore
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import TextField from '@mui/material/TextField';

import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string().required('Bạn phải điền số điện thoại'),
    password: Yup.string().required('Bạn phải điền mật khẩu'),
  });

  const defaultValues = {
    phone: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  const [valphone, setPhone] = useState("")
  const [valpassword, setPassword] = useState("")
  const [isAuthen, setAuthen] = useState(false)
  const submitForm = () =>{
    document.cookie = `${document.cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    axios({
      method: 'post',
      url: 'http://localhost:8888/api/login',
      data: { "phone": valphone, "passwd": valpassword },
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    }).then(res => {
      
      console.log(document.cookie)
      if (res.data.authen === true){
        setAuthen(true)
      }});
  }

  useEffect(()=>{
    axios({
      method: 'post',
      url: 'http://localhost:8888/api/login',
      data: { "phone": '', "passwd": ''},
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      
    }).then(res => {
      if (res.data.authen === true){
        setAuthen(true)
      }});
    
  }, [])


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {isAuthen && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            Đăng nhập thành công
          </Alert>
        </Stack>}
        {!isAuthen && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Đăng nhập thất bại
          </Alert>
        </Stack>
        
        }
        <TextField id="outlined-basic" name="phone" onChange={(e)=> setPhone(e.target.value)} label="Số điện thoại" variant="outlined" />
        <TextField
          name="password"
          label="Mật khẩu"
          onChange={(e)=> setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Ghi nhớ mật khẩu" />
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>
      <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={()=>submitForm()} loading={isSubmitting}>
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
