import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'kamar.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const daftarKamar = JSON.parse(fileContent);

    // Cari kamar yang ID-nya cocok
    const kamarPilihan = daftarKamar.find((k: any) => k.id === parseInt(params.id));

    if (!kamarPilihan) {
      return NextResponse.json({ error: 'Kamar tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(kamarPilihan);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memuat data' }, { status: 500 });
  }
}