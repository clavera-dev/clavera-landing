/**
 * Candidate zones for the zone selector (hero and S10).
 *
 * Working list confirmed by owner response v1.2 §1.8. Edit the one data file,
 * candidate-zones.ts, when a replacement arrives.
 *
 * Labels are the original Spanish names in every locale and are never
 * translated or transliterated. No zone is numbered, ranked or marked first.
 *
 * A slug is the only zone datum that ever reaches a URL, as the survey's
 * `candidate_zone` fragment parameter. Slugs come from the data file only —
 * never from free text — so nothing a visitor types can enter a URL.
 */
import { CANDIDATE_ZONE_DATA as data } from './candidate-zones';

export interface CandidateZone {
	slug: string;
	label: string;
}

const SLUG_PATTERN = /^[a-z0-9_]+$/;

function checked(zones: CandidateZone[]): CandidateZone[] {
	for (const zone of zones) {
		if (!SLUG_PATTERN.test(zone.slug)) {
			throw new Error(`candidate-zones.json: invalid slug "${zone.slug}"`);
		}
		if (zone.label.trim() === '') {
			throw new Error(`candidate-zones.json: empty label for "${zone.slug}"`);
		}
	}
	return zones;
}

/** `working` per owner response v1.2; this does not confirm any opening. */
export const CANDIDATE_ZONES_STATUS: string = data.status;

/** Barrios, alphabetical, then the two catch-all options. */
export const CANDIDATE_ZONES: CandidateZone[] = checked([...data.zones, ...data.catchAll]);

const slugs = new Set(CANDIDATE_ZONES.map((zone) => zone.slug));
if (slugs.size !== CANDIDATE_ZONES.length) {
	throw new Error('candidate-zones.json: duplicate slug');
}

export function isCandidateZoneSlug(slug: string): boolean {
	return slugs.has(slug);
}
