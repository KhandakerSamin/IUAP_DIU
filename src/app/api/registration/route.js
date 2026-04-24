import { insertFamilyMember, insertRegistration, runInTransaction } from "@/lib/db";
import { saveUpload } from "@/lib/fileStorage";

export const dynamic = "force-dynamic";

const REQUIRED_TEXT_FIELDS = [
  "givenName",
  "surname",
  "email",
];

function buildRegId() {
  return `reg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function pickFile(form, name) {
  const value = form.get(name);
  if (!value) return null;
  if (typeof value !== "object" || typeof value.arrayBuffer !== "function") return null;
  return value;
}

function pickText(form, name) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  for (const field of REQUIRED_TEXT_FIELDS) {
    if (!pickText(form, field).trim()) {
      return Response.json({ error: `${field} is required.` }, { status: 400 });
    }
  }

  const profilePhotoFile = pickFile(form, "profilePhoto");
  const passportScanFile = pickFile(form, "passportScan");

  if (!profilePhotoFile || (profilePhotoFile.size ?? 0) === 0) {
    return Response.json({ error: "Profile picture is required." }, { status: 400 });
  }
  if (!passportScanFile || (passportScanFile.size ?? 0) === 0) {
    return Response.json({ error: "Passport front page scan is required." }, { status: 400 });
  }

  const hasFamilyMembers = pickText(form, "hasFamilyMembers");
  const familyMembersCount = pickText(form, "familyMembersCount");
  const familyMembersOther = pickText(form, "familyMembersOther");

  let familyMemberCount = 0;
  if (hasFamilyMembers === "Yes") {
    if (familyMembersCount === "Others") {
      const parsed = parseInt(familyMembersOther, 10);
      if (!Number.isInteger(parsed) || parsed < 1) {
        return Response.json({ error: "Invalid family member count." }, { status: 400 });
      }
      familyMemberCount = Math.min(parsed, 10);
    } else {
      const parsed = parseInt(familyMembersCount, 10);
      if (!Number.isInteger(parsed) || parsed < 1) {
        return Response.json({ error: "Invalid family member count." }, { status: 400 });
      }
      familyMemberCount = parsed;
    }
  }

  const regId = buildRegId();
  let profilePhotoPath;
  let passportScanPath;

  try {
    profilePhotoPath = await saveUpload({
      file: profilePhotoFile,
      kind: "profiles",
      slug: `${regId}-profile`,
    });
    passportScanPath = await saveUpload({
      file: passportScanFile,
      kind: "passports",
      slug: `${regId}-passport`,
    });
  } catch (err) {
    return Response.json({ error: err?.message || "Could not save uploads." }, { status: 400 });
  }

  const familyUploads = [];
  for (let i = 0; i < familyMemberCount; i++) {
    const fullName = pickText(form, `familyMembers[${i}][fullName]`).trim();
    const passportNo = pickText(form, `familyMembers[${i}][passportNo]`).trim();
    const email = pickText(form, `familyMembers[${i}][email]`).trim();
    const phone = pickText(form, `familyMembers[${i}][phone]`).trim();
    const tShirtSize = pickText(form, `familyMembers[${i}][tShirtSize]`).trim();
    const profileFile = pickFile(form, `familyMembers[${i}][profilePhoto]`);
    const passportFile = pickFile(form, `familyMembers[${i}][passportScan]`);

    if (!fullName) {
      return Response.json({ error: `Family member #${i + 1}: full name is required.` }, { status: 400 });
    }
    if (!passportNo) {
      return Response.json({ error: `Family member #${i + 1}: passport number is required.` }, { status: 400 });
    }
    if (!email) {
      return Response.json({ error: `Family member #${i + 1}: email is required.` }, { status: 400 });
    }
    if (!phone) {
      return Response.json({ error: `Family member #${i + 1}: phone number is required.` }, { status: 400 });
    }
    if (!tShirtSize) {
      return Response.json({ error: `Family member #${i + 1}: T-shirt size is required.` }, { status: 400 });
    }
    if (!profileFile || (profileFile.size ?? 0) === 0) {
      return Response.json({ error: `Family member #${i + 1}: profile picture is required.` }, { status: 400 });
    }
    if (!passportFile || (passportFile.size ?? 0) === 0) {
      return Response.json({ error: `Family member #${i + 1}: passport scan is required.` }, { status: 400 });
    }

    try {
      const profilePath = await saveUpload({
        file: profileFile,
        kind: "family",
        slug: `${regId}-fm${i + 1}-profile`,
      });
      const passportPath = await saveUpload({
        file: passportFile,
        kind: "family",
        slug: `${regId}-fm${i + 1}-passport`,
      });
      familyUploads.push({ fullName, passportNo, email, phone, tShirtSize, profilePath, passportPath });
    } catch (err) {
      return Response.json(
        { error: `Family member #${i + 1}: ${err?.message || "could not save uploads."}` },
        { status: 400 }
      );
    }
  }

  const registrationRow = {
    reg_id: regId,
    title: pickText(form, "title") || null,
    other_title: pickText(form, "otherTitle") || null,
    given_name: pickText(form, "givenName"),
    surname: pickText(form, "surname"),
    gender: pickText(form, "gender") || null,
    passport_no: pickText(form, "passportNo") || null,
    nationality: pickText(form, "nationality") || null,
    date_of_birth: pickText(form, "dateOfBirth") || null,
    organization: pickText(form, "organization") || null,
    position: pickText(form, "position") || null,
    department: pickText(form, "department") || null,
    address: pickText(form, "address") || null,
    zip_code: pickText(form, "zipCode") || null,
    city: pickText(form, "city") || null,
    country: pickText(form, "country") || null,
    phone: pickText(form, "phone") || null,
    whatsapp: pickText(form, "whatsapp") || null,
    email: pickText(form, "email").toLowerCase(),
    alternative_email: pickText(form, "alternativeEmail") || null,
    tshirt_size: pickText(form, "tShirtSize") || null,
    food_requirement: pickText(form, "foodRequirement") || null,
    other_food: pickText(form, "otherFood") || null,
    is_member_university: pickText(form, "isMemberUniversity") || null,
    has_family_members: hasFamilyMembers || null,
    family_members_count: familyMembersCount || null,
    family_members_other: familyMembersOther || null,
    needs_invitation_letter: pickText(form, "needsInvitationLetter") || null,
    payment_method: pickText(form, "paymentMethod") || null,
    profile_photo_path: profilePhotoPath,
    passport_scan_path: passportScanPath,
  };

  try {
    runInTransaction(() => {
      const registrationId = insertRegistration(registrationRow);
      for (const fm of familyUploads) {
        insertFamilyMember({
          registration_id: registrationId,
          full_name: fm.fullName,
          passport_no: fm.passportNo || null,
          email: fm.email || null,
          phone: fm.phone || null,
          tshirt_size: fm.tShirtSize || null,
          profile_photo_path: fm.profilePath,
          passport_scan_path: fm.passportPath,
        });
      }
    });
  } catch (err) {
    console.error("[registration] DB insert failed", err);
    return Response.json({ error: "Could not save registration. Please try again." }, { status: 500 });
  }

  return Response.json({ reg_id: regId });
}
