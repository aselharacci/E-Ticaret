export default function Pagination({ currentPage, totalPages, onPageChange }) {
	// sayfa numaralarını hesapla
	const getPages = () => {
		const pages = [];
		const delta = 2; // currentPage'in etrafında kaç sayı gözüksün

		let start = Math.max(2, currentPage - delta);
		let end = Math.min(totalPages - 1, currentPage + delta);

		// Başlangıç
		pages.push(1);

		if (start > 2) {
			pages.push("...");
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (end < totalPages - 1) {
			pages.push("...");
		}

		// Bitiş
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pages = getPages();

	return (
		<div className="flex justify-center items-center mt-10">
			<div className="flex border border-[#a5a3a3] rounded shadow text-sm font-medium overflow-x-auto text-nowrap">
				{/* First */}
				<button
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
					className={`px-4 py-2 min-w-[60px] h-[74px] border-r border-[#a5a3a3] ${currentPage === 1
							? "text-[#BDBDBD] bg-[#f0f0f0] cursor-not-allowed font-bold"
							: "text-[#00aaff] hover:bg-[#f0faff]"
						}`}
				>
					First
				</button>

				{/* Sayfa numaraları */}
				{pages.map((p, idx) =>
					p === "..." ? (
						<span
							key={idx}
							className="flex justify-center items-center px-3 py-2 min-w-[46px] border-r border-[#a5a3a3] text-gray-400 bg-white"
						>
							...
						</span>
					) : (
						<button
							key={p}
							onClick={() => onPageChange(p)}
							disabled={p === currentPage}
							className={`px-4 py-2 min-w-[46px] border-r border-[#a5a3a3] ${p === currentPage
									? "bg-[#00aaff] text-white font-bold"
									: "bg-white text-[#00aaff] hover:bg-[#f0faff]"
								}`}
						>
							{p}
						</button>
					)
				)}

				{/* Next */}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`px-4 py-2 min-w-[60px] ${currentPage === totalPages
							? "text-gray-400 bg-gray-100 cursor-not-allowed"
							: "text-[#00aaff] hover:bg-[#f0faff]"
						}`}
				>
					Next
				</button>
			</div>
		</div>
	);
}
