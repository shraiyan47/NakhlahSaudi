


export function handleSubmit (response, toast, title,router, link) {

    if (response.status === 200) {
        // Login successful
        toast({
            title: `${title} Successful `,
        })
        router.push(`/${link}`)
    } else {
        toast({
            title: `${title} failed`
        })
    };
    
}
