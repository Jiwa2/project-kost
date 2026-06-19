import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Pastikan menambahkan async pada fungsi GET, dan params dibungkus Promise
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const idKamar = resolvedParams.id;

    const filePath = path.join(process.cwd(), 'data', 'kamar.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const daftarKamar = JSON.parse(fileContent);

    const kamar = daftarKamar.find((k: any) => String(k.id) === String(idKamar));

    if (!kamar) {
      return NextResponse.json(
        { error: 'Kamar tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(kamar);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal memuat data kamar' },
      { status: 500 }
    );
  }
}