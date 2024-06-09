import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 加密文章校验组件
 * @param {password, validPassword} props
 * @param password 正确的密码
 * @param validPassword(bool) 回调函数，校验正确回调入参为true
 * @returns
 */
const ArticleLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()

  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }

  const passwordInputRef = useRef(null)
  useEffect(() => {
    // 选中密码输入框并将其聚焦
    passwordInputRef.current.focus()
  }, [])

  return (
    <div id='container' className='flex justify-center'>
      <div className='shadow md:hover:shadow-2xl overflow-x-auto max-w-5xl  w-screen md:w-full  py-10 px-5 lg:pt-24 md:px-24 min-h-screen dark:border-gray-700 bg-white duration-200 subpixel-antialiased'>
        <div className='w-full flex justify-center items-center h-96 '>
          <div className='text-center space-y-3 dark:text-gray-300 text-black'>
            <div className='font-bold'>
              이 글은 개인적인 글입니다. 아래의 질문에 답을 해주세요!
            </div>
            <div className='font-bold'>Q: 제 동생의 이름을 적어주세요.</div>
            <div className='flex mx-4'>
              <input
                id='password'
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    submitPassword()
                  }
                }}
                ref={passwordInputRef} // 绑定ref到passwordInputRef变量
                className='outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg  font-light leading-10 bg-gray-100 dark:bg-gray-500'></input>
              <div
                onClick={submitPassword}
                className='px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2 bg-gray-700 hover:bg-gray-400 text-white rounded-r duration-300'>
                <i className={'duration-200 cursor-pointer fas fa-key'}>
                  &nbsp;{locale.COMMON.SUBMIT}
                </i>
              </div>
            </div>
            <div id='tips'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleLock
