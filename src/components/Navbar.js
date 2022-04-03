import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import 'react-notifications/lib/notifications.css';

import store from '../app/store';
import { removeUser } from '../pages/auth/authSlice';

export function Navbar() {
  let navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const onLogout = async (data) => {
    store.dispatch(removeUser());
    NotificationManager.success('Logout success', 'Logout Info');
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  };
  return (
    <nav class='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
      <div class='container flex flex-wrap justify-between items-center mx-auto'>
        <a href='/' class='flex items-center'>
          <span
            class='self-center text-xl font-semibold whitespace-nowrap dark:text-white'
            style={{ color: '#FFCC00' }}
          >
            NEIAK
          </span>
        </a>
        <div class='flex md:order-2'>
          <div class='hidden relative mr-3 md:mr-0 md:block'>
            <div class='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                class='w-5 h-5 text-gray-500'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='email-adress-icon'
              class='block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search...'
            />
          </div>
          <button
            data-collapse-toggle='mobile-menu-3'
            type='button'
            class='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='mobile-menu-3'
            aria-expanded='false'
          >
            <span class='sr-only'>Open main menu</span>
            <svg
              class='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <svg
              class='hidden w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div
          class='hidden justify-between items-center w-full md:flex md:w-auto md:order-1'
          id='mobile-menu-3'
        >
          <ul class='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
            <li>
              <a
                href='/'
                class='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/'
                class='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                About
              </a>
            </li>
            <li>
              <a
                href='/'
                class='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Services
              </a>
            </li>
          </ul>
        </div>
        <button
          id='dropdownDefault'
          data-dropdown-toggle='dropdown_bt'
          class='flex items-center md:order-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='button'
        >
          {authState.isLogin ? `Hi ${authState.user.name}` : 'Login'}
          <svg
            class='ml-2 w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        <div
          id='dropdown_bt'
          class='hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700'
        >
          <ul
            class='py-1 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownDefault'
          >
            <li>
              <a
                href='/'
                class='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='/'
                class='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Settings
              </a>
            </li>
            {!authState.isLogin && (
              <li>
                <a
                  href='/register'
                  class='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Register
                </a>
              </li>
            )}
            {!authState.isLogin && (
              <li>
                <Link
                  to='/login'
                  class='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Login
                </Link>
              </li>
            )}

            {authState.isLogin && (
              <li>
                <a
                  onClick={() => onLogout()}
                  href='/'
                  class='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
