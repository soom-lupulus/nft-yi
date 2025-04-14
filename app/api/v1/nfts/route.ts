import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    console.log(6987);
    return NextResponse.json({
        code: 500,
        msg: 'test'
    })
}

export async function POST(request: Request) {
    console.log('post');
    const nft = await prisma.nft.create({
        data: {
            price: '1.52',
            name: 'ceshi',
            rating: 1.2
        }
    })

    return NextResponse.json({
        code: 500,
        msg: 'test post'
    })
}