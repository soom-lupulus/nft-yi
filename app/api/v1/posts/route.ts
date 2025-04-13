import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    console.log(6987);
    return NextResponse.json({
        code: 500,
        msg: 'test'
    })
}