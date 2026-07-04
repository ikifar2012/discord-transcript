
import { HOUR_PACKS } from "@/app/data/prices";

const HOUR_PACKS_BY_ID = new Map(HOUR_PACKS.map((pack) => [String(pack.id), pack] as const));

export async function getSecondsFromPack(packId: string): Promise<number> {
	const pack = HOUR_PACKS_BY_ID.get(packId);

	if (!pack) {
		throw new Error("Invalid hour pack ID");
	}

	return pack.seconds;
}
