"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AMA } from '@/lib/ImageLocation'
import Image from 'next/image'


function DeveloperAMA() {
    return (
        <Card className='w-[33.33%] textPrimaryColor bg-white border-none rounded-xl p-0'>
            <Image src={AMA} alt='AMA'  className='w-full rounded-t-2xl'/>
            <CardContent className='mt-5'>
                <div className='flex gap-4'>
                    <div className='text-2xl text-center pr-2 border-r-[2px]'>
                        <p >WED</p>
                        <p className='text-gray-600'>7</p>
                    </div>
                    <div className=''>
                        <h4 className='text-xl'>Developer AMA</h4>
                        <p>Meet project developers</p>
                    </div>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default DeveloperAMA