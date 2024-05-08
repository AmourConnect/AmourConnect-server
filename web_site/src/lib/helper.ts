export function ConvertingADateOfBirthToAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const isValidDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        return false;
    }

    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
};