import axios from 'axios'

export default property => {
    property.axios = axios

    let reqOption = () => {
        return {
            headers: {
                'Content-Type': 'Application/json',
            },
            timeout: 60000,
        }
    }
    let reqOptionWithToken = () => {
        return {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
            timeout: 60000,
        }
    }
    let reqOptionForDownload = () => {
        return {
            headers: {
                'Content-Type': 'Application/json',
            },
            timeout: 60000,
            responseType: 'blob',
        }
    }
    let reqOptionWithTokenForDownload = () => {
        return {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
            timeout: 60000,
            responseType: 'blob',
        }
    }

    let pending_get = {}
    let pending_post = {}
    let pending_put = {}
    let pending_delete = {}

    // --------------------- EndPoint ---------------------
    property.$DOMAIN = import.meta.env.VITE_APP_DOMAIN
    property.$GPT_DREAM_HELPER = '/gpt-api/dream-helper'
    property.$GPT_THREAD_DELETE = '/gpt-api/gpt-thread'

    // --------------------- GET ---------------------
    property.$get = function (callUrl, caller, useToken, success, fail) {
        if (pending_get[arguments[0] + caller]) {
            console.log('duplication api get fail : ' + arguments[0] + caller)
            return
        }

        pending_get[arguments[0] + caller] = true
        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                this.$router.replace({ name: 'Splash' })
            }
        }

        axios.get(this.$DOMAIN + callUrl, _reqOption).then((response) => {
            pending_get[arguments[0] + caller] = false

            if (response.status === 200) {
                success(response.data)
            } else {
                fail(response)
            }

        }).catch(e => {
            pending_get[arguments[0] + caller] = false
            fail(e)
        })
    }

    // --------------------- POST ---------------------
    property.$post = function (callUrl, caller, postData, useToken, success, fail) {
        if (pending_post[arguments[0] + caller]) {
            console.log('duplication api post fail : ' + arguments[0] + caller)
            return
        }

        pending_post[arguments[0] + caller] = true
        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                this.$router.replace({ name: 'Main' })
            }
        }

        axios.post(this.$DOMAIN + callUrl, postData, _reqOption).then((response) => {
            pending_post[arguments[0] + caller] = false

            if (response.status === 200) {
                success(response.data)
            } else {
                fail(response)
            }

        }).catch(e => {
            pending_post[arguments[0] + caller] = false
            fail(e)
        })
    }

    // --------------------- PUT ---------------------
    property.$put = function (callUrl, caller, postData, useToken, success, fail) {
        if (pending_put[arguments[0] + caller]) {
            console.log('duplication api put fail : ' + arguments[0] + caller)
            return
        }

        pending_put[arguments[0] + caller] = true
        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                this.$router.replace({ name: 'Main' })
            }
        }

        axios.put(this.$DOMAIN + callUrl, postData, _reqOption).then((response) => {
            pending_put[arguments[0] + caller] = false

            if (response.data.result === true) {
                success(response.data)
            } else {
                fail(response)
            }
        }).catch(e => {
            pending_put[arguments[0] + caller] = false
            fail(e)
        })
    }

    // --------------------- DELETE ---------------------
    property.$delete = function (callUrl, caller, useToken, success, fail) {
        if (pending_delete[arguments[0] + caller]) {
            console.log('duplication api delete fail : ' + arguments[0] + caller)
            return
        }

        pending_delete[arguments[0] + caller] = true
        let _reqOption = reqOption()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithToken()
            } else {
                this.$router.replace({ name: 'Main' })
            }
        }

        axios.delete(this.$DOMAIN + callUrl, _reqOption).then((response) => {
            pending_delete[arguments[0] + caller] = false

            if (response.data.result === true) {
                success(response.data)
            } else {
                fail(response)
            }
        }).catch(e => {
            pending_delete[arguments[0] + caller] = false
            fail(e)
        })
    }

    // --------------------- DOWNLOAD ---------------------
    property.$download = function (callUrl, caller, useToken, success, fail) {
        if (pending_get[arguments[0] + caller]) {
            console.log('duplication api download get fail : ' + arguments[0] + caller)
            return
        }

        pending_get[arguments[0] + caller] = true
        let _reqOption = reqOptionForDownload()

        if (useToken) {
            let token = sessionStorage.getItem('accessToken')
            if (token && token.length > 0) {
                _reqOption = reqOptionWithTokenForDownload()
            } else {
                this.$router.replace({ name: 'Main' })
            }
        }

        axios.get(this.$IMG_DOMAIN + callUrl, _reqOption).then(response => {
            pending_get[arguments[0] + caller] = false

            if (response.headers['content-type'] === 'application/octet-stream') {
                success(response)
            } else {
                fail(response.data)
            }
        }).catch(e => {
            pending_get[arguments[0] + caller] = false
            fail(e)
        })
    }

    // --------------------- DOWNLOAD GET ---------------------
    property.$download_get = function (callUrl, caller, img, others, fail) {
        if (pending_get[arguments[0] + caller]) {
            console.log('duplication api download_img get fail : ' + arguments[0] + caller)
            return
        }

        pending_get[arguments[0] + caller] = true

        let _reqOption = reqOptionForDownload()
        let token = sessionStorage.getItem('accessToken')

        if (token && token.length > 0) {
            _reqOption = reqOptionWithTokenForDownload()
        }

        axios.get(this.$IMG_DOMAIN + callUrl, _reqOption).then((response) => {
            pending_get[arguments[0] + caller] = false

            if (response.headers['content-type'] === 'image/jpeg' || response.headers['content-type'] === 'image/png') {
                img(response.request.responseURL)
            } else {
                others(response)
            }
        }).catch(e => {
            pending_get[arguments[0] + caller] = false
            fail(e)
        })

    }
}
