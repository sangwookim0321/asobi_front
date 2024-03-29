import axios from 'axios'

const useApi = () => {

    let pending_get = {}
    let pending_post = {}
    let pending_put = {}
    let pending_delete = {}

    const reqOption = () => {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 120000,
        }
    }
    const reqOptionWithToken = () => {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
            timeout: 120000,
        }
    }

    const endPoints = {
        DOMAIN: import.meta.env.VITE_APP_DOMAIN,
        GPT_HELPER: '/gpt-api/gpt-helper',
        GPT_THREAD_DELETE: '/gpt-api/gpt-thread',
        GPT_CHAT_HELPER: '/gpt-api/gpt-chat',
        GPT_MBTI_HELPER: '/gpt-api/gpt-mbit-helper',
        GTP_KADAN_AI: '/gpt-api/beta-kadan-ai',
        TEST_API: '/gpt-api/test-api',
    }

    const httpGet = async (callUrl, caller, useToken, success, fail, redirection) => {
        const reqKey = callUrl + caller
        if (pending_get[reqKey]) {
            console.log('duplication api get fail : ' + reqKey)
            return
        }

        pending_get[reqKey] = true

        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                redirection() // 토큰이 없을 경우 리다이렉션 콜백
            }
        }

        try {
            const response = await axios.get(endPoints.DOMAIN + callUrl, _reqOption)
            success(response.data)
        } catch (err) {
            fail(err)
        } finally {
            pending_get[reqKey] = false
        }
    }

    const httpPost = async (callUrl, caller, postData, useToken, success, fail, redirection, finallyCallback) => {
        const reqKey = callUrl + caller
        if (pending_post[reqKey]) {
            console.log('duplication api post fail : ' + reqKey)
            return
        }

        pending_post[reqKey] = true

        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                redirection() // 토큰이 없을 경우 리다이렉션 콜백
            }
        }

        try {
            const response = await axios.post(endPoints.DOMAIN + callUrl, postData, _reqOption)
            success(response.data)
        } catch (err) {
            fail(err)
        } finally {
            pending_post[reqKey] = false
            finallyCallback() // 최종 작업 완료 후 콜백
        }
    }

    const httpPut = async (callUrl, caller, postData, useToken, success, fail, redirection) => {
        const reqKey = callUrl + caller
        if (pending_put[reqKey]) {
            console.log('duplication api put fail : ' + reqKey)
            return
        }

        pending_put[reqKey] = true

        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                redirection() // 토큰이 없을 경우 리다이렉션 콜백
            }
        }

        try {
            const response = await axios.put(endPoints.DOMAIN + callUrl, postData, _reqOption)
            success(response.data)
        } catch (err) {
            fail(err)
        } finally {
            pending_put[reqKey] = false
        }
    }

    const httpDelete = async (callUrl, caller, useToken, success, fail, redirection) => {
        const reqKey = callUrl + caller
        if (pending_delete[reqKey]) {
            console.log('duplication api delete fail : ' + reqKey)
            return
        }

        pending_delete[reqKey] = true

        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                redirection() // 토큰이 없을 경우 리다이렉션 콜백
            }
        }

        try {
            const response = await axios.delete(endPoints.DOMAIN + callUrl, _reqOption)
            success(response.data)
        } catch (err) {
            fail(err)
        } finally {
            pending_delete[reqKey] = false
        }
    }

    return { httpGet, httpPost, httpPut, httpDelete, endPoints }
}

export default useApi