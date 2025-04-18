import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 暂时写死
        const whitelist = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]

        return NextResponse.json({ data: whitelist, msg: '获取成功！', code: 200 }, {
            status: 200,
        });
    } catch (error) {

        return NextResponse.json({ text: "Error fetching whitelist:" }, { status: 500 });
    }
}