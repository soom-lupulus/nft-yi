import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    if (id) {
        const nft = await prisma.nft.findUnique({
            where: { id }
        })
        return NextResponse.json({
            code: 200,
            msg: '查询成功！',
            data: nft
        })
    } else {
        const nfts = await prisma.nft.findRaw()
        return NextResponse.json({
            code: 200,
            msg: '查询成功！',
            data: nfts
        })
    }

}

export async function POST(request: Request) {
    const data = await request.json()
    const nft = await prisma.nft.create({
        data
    })
    return NextResponse.json({
        code: 200,
        msg: '创建成功！',
        data: nft
    })
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    if (id) {
        const nft = await prisma.nft.delete({
            where: { id }
        })
        return NextResponse.json({
            code: 200,
            msg: '删除成功！',
            data: nft
        })
    } else {
        return NextResponse.json({
            code: 400,
            msg: '参数id为空！',
            data: null
        }, { status: 400 })
    }
}