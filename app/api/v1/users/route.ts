import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')
    const username = searchParams.get('username')
    if (!walletAddress) {
        return NextResponse.json({
            code: 400,
            msg: '缺少钱包address！',
        }, { status: 400 })
    }
    if (!username) {
        return NextResponse.json({
            code: 400,
            msg: '缺少用户名！',
        }, { status: 400 })
    }
    const user = await prisma.users.findUnique({
        where: {
            walletAddress
        }
    })
    if (user) {
        return NextResponse.json({
            code: 400,
            msg: '用户已存在！',
            data: user
        }, { status: 400 })
    }
    const newUser = await prisma.users.create({
        data: {
            walletAddress,
            username
        }
    })
    return NextResponse.json({
        code: 200,
        msg: '创建用户成功！',
        data: newUser
    })
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
        return NextResponse.json({
            code: 400,
            msg: '缺少钱包address！',
        }, { status: 400 })
    }
    const user = await prisma.users.findUnique({
        where: {
            walletAddress
        }
    })
    if (!user) {
        return NextResponse.json({
            code: 404,
            msg: '用户不存在！',
            data: null
        }, { status: 404 })
    }
    return NextResponse.json({
        code: 200,
        msg: '查询成功！',
        data: user
    })
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')
    const username = searchParams.get('username')
    const email = searchParams.get('email')
    if (!walletAddress) {
        return NextResponse.json({
            code: 400,
            msg: '缺少钱包address！',
        }, { status: 400 })
    }
    if (!username) {
        return NextResponse.json({
            code: 400,
            msg: '缺少username！',
        }, { status: 400 })
    }
    const updateUser = await prisma.users.update({
        where: {
            walletAddress
        },
        data: {
            username,
            email
        }
    })
    return NextResponse.json({
        code: 200,
        msg: '修改成功！',
        data: updateUser
    })
}