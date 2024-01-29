"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AiOutlineLike } from 'react-icons/ai'


const data =[
    {
        id: 1,
        title: 'New Subscribers - $20',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 2,
        title: 'New Subscribers - $28',
        subTitle: '07 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 3,
        title: 'New Subscribers - $22',
        subTitle: '10 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 4,
        title: 'New Subscribers - $20',
        subTitle: '02 March',
        icon: <AiOutlineLike/>
    },
    {
        id: 5,
        title: 'New Subscribers - $26',
        subTitle: '04 March',
        icon: <AiOutlineLike/>
    },
]
function Transactions() {
    return (
        <Card className='w-[33.33%] textPrimaryColor bg-white border-none rounded-xl'>
            <CardHeader>
                <CardTitle className='textSemiHeader font-bold'>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className='w-[90%] mx-auto flex flex-col gap-5 mb-5'>
                {data.map(item=>(
                    <div key={item.id} className='flex gap-3'>
                        <div className='text-3xl w-12 h-12 bg-black/40 flex items-center justify-center text-white rounded'>{item.icon}</div>
                        <div>
                            <p className='text-xl'>{item.title}</p>
                            <p className='text-[16px]'>{item.subTitle}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Transactions