import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { BiLogInCircle } from "react-icons/bi";
import { MdLockPerson } from "react-icons/md";
import { CiUser } from 'react-icons/ci'
import { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowToggle = () => { setShowPassword(!showPassword) };

  return (
    <section className='login_section'>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5">
            <form className='border p-3 p-md-5 bg-light'>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Email or Phone</label>
                  <div className='position-relative'>
                    <input type="text" name='user_name' className='form-control rounded-0 ps-5' placeholder='Enter Your User' required />
                    <CiUser className='login_user_icon' />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} name='password' className='form-control rounded-0 ps-5' placeholder='****' required />
                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    <MdLockPerson className='login_lock_icon' />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <button type="submit" className='login_btn'><BiLogInCircle />Sign In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage