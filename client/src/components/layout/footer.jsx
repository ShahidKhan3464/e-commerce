import dayjs from 'dayjs';

export default function Footer() {
  return (
    <footer className="bg-white text-center p-6 shadow-inner">
      <p className="text-sm text-gray-600">
        © {dayjs().year()} My Store. All rights reserved.
      </p>
    </footer>
  );
}
