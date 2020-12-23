export default function({ $axios, redirect }) {
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        switch (code) {
            case 400:
                redirect('/404')
            case 500:
                redirect('/404')
            default:
                redirect('/404')
                return
        }
    })
}