'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useNavbarState } from '@/store/useAdminStore'
import { useEffect, useState } from 'react'


function MenuCards() {
    const isOpenCall = useNavbarState((state) => state.isOpen)
    const lists = [
        {
            id: 1,
            title: 'New User',
            subTitle: 'From last month',
            num: '1500'
        },
        {
            id: 2,
            title: 'Paid User',
            subTitle: 'This Year',
            num: '287'
        },
        {
            id: 3,
            title: 'Monthly Subscribers',
            subTitle: 'Last 30 days',
            num: '$7.4k'
        },
        {
            id: 4,
            title: 'Other Transaction',
            subTitle: 'Last 30 days',
            num: '$1.6k'
        },
    ]
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (

        <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 `}>
            {
                lists.map(item => (

                    <Card key={item.id} className=' textPrimaryColor bg-white border-none rounded-xl'>
                        <CardHeader>
                            <CardTitle className='textSemiHeader font-bold'>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex justify-between py-1 items-center'>
                                <p className='textSmall textSecondaryColor'>{item.subTitle}</p>
                                <h1 className='textHeader font-bold'>{item.num}</h1>
                            </div>

                            <Progress
                                // You can set the theme to the desired color
                                style={{ backgroundColor: 'var(--uDBg)' }}
                                indentorColor={`bg-[--uDHoverText]`} // Change the background color here
                                value={progress} // Set the progress value
                            />

                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}

export default MenuCards