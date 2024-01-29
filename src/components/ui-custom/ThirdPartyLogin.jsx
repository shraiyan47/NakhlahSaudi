import Image from 'next/image';

const ThirdPartyLogin = () => {
    const list=[
        {
            id: 1,
            img:'/assets/images/Facebook.webp',
            subTitle: 'Contact with Facebook'
        },
        {
            id: 2,
            img:'/assets/images/twitter.png',
            subTitle: 'Contact with Twitter'
        },
        {
            id: 3,
            img:'/assets/images/google.png',
            subTitle: 'Contact with Google'
        },
    ]
    return (
        <div className='flex flex-col gap-3'>
            {
                list.map(item=>(
                    <button key={item.id} className='flex sm:gap-5 gap-2 sm:text-xl text-[16px] text-black bg-[--bgSecondary]  px-4 py-2 rounded-full border-[1px] border-[--inputBorderPrimary]' >
                        <Image src={item.img} alt={item.subTitle} width={30} height={30} />
                        <h1 className=''>{item.subTitle}</h1>
                    </button>
                ))
            }
        </div>
    );
};


export default ThirdPartyLogin;