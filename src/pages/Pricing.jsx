import React from "react";
import Brands from "../components/brands/Brands"; // kendi proje yoluna göre ayarla

export default function Pricing() {
	return (
		<div className="font-[Montserrat]">
			{/* Header Section */}
			<section className="py-16 text-center">
				<h4 className="text-gray-500 font-semibold tracking-wide uppercase mb-2">
					Pricing
				</h4>
				<h1 className="text-4xl font-bold text-[#252B42] mb-4">
					Simple Pricing
				</h1>

				{/* Breadcrumbs */}
				<div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
					<span className="font-semibold text-[#252B42]">Home</span>
					<span>{">"}</span>
					<span>Pricing</span>
				</div>
			</section>

			{/* Pricing Table Section */}
			<section className="py-16 bg-[#f9f9f9]">
				<div className="max-w-6xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-bold text-[#252B42] mb-2">Pricing</h2>
					<p className="text-gray-500 max-w-xl mx-auto">
						Problems trying to resolve the conflict between the two major realms
						of Classical physics: Newtonian mechanics
					</p>

					{/* Toggle Monthly / Yearly */}
					<div className="flex justify-center items-center gap-4 mt-6">
						<span className="text-gray-600">Monthly</span>
						<label className="inline-flex relative items-center cursor-pointer">
							<input type="checkbox" className="sr-only peer" />
							<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition"></div>
							<span className="ml-3 text-gray-600">Yearly</span>
						</label>
						<span className="text-blue-500 font-semibold">Save 25%</span>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
					{/* Free Plan */}
					<div className="border rounded-xl p-8 text-center shadow-sm bg-white">
						<h3 className="text-xl font-bold mb-2">FREE</h3>
						<p className="text-gray-500 mb-4">
							Organize across all apps by hand
						</p>
						<p className="text-3xl font-bold text-[#252B42]">
							0<span className="text-lg font-normal text-gray-500">$</span>
						</p>
						<p className="text-sm text-gray-400 mb-6">Per Month</p>

						<ul className="space-y-3 text-sm text-left">
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li className="text-gray-400">❌ 1GB Cloud storage</li>
							<li className="text-gray-400">❌ Email and community support</li>
						</ul>

						<button className="mt-6 w-full py-3 bg-[#252B42] text-white rounded-lg">
							Try for free
						</button>
					</div>

					{/* Standard Plan */}
					<div className="border rounded-xl p-8 text-center shadow-lg bg-[#252B42] text-white scale-105">
						<h3 className="text-xl font-bold mb-2">STANDARD</h3>
						<p className="text-gray-300 mb-4">
							Organize across all apps by hand
						</p>
						<p className="text-3xl font-bold">
							9.99<span className="text-lg font-normal text-gray-300">$</span>
						</p>
						<p className="text-sm text-gray-300 mb-6">Per Month</p>

						<ul className="space-y-3 text-sm text-left">
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li className="text-gray-400">❌ 1GB Cloud storage</li>
							<li className="text-gray-400">❌ Email and community support</li>
						</ul>

						<button className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg">
							Try for free
						</button>
					</div>

					{/* Premium Plan */}
					<div className="border rounded-xl p-8 text-center shadow-sm bg-white">
						<h3 className="text-xl font-bold mb-2">PREMIUM</h3>
						<p className="text-gray-500 mb-4">
							Organize across all apps by hand
						</p>
						<p className="text-3xl font-bold text-[#252B42]">
							19.99<span className="text-lg font-normal text-gray-500">$</span>
						</p>
						<p className="text-sm text-gray-400 mb-6">Per Month</p>

						<ul className="space-y-3 text-sm text-left">
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li>✅ Unlimited product updates</li>
							<li className="text-gray-400">❌ 1GB Cloud storage</li>
							<li className="text-gray-400">❌ Email and community support</li>
						</ul>

						<button className="mt-6 w-full py-3 bg-[#252B42] text-white rounded-lg">
							Try for free
						</button>
					</div>

				</div>
			</section>

			{/* Brands Section */}
			<Brands />

			{/* FAQs Section */}
			<section className="py-20 text-center">
				<h2 className="text-3xl font-bold text-[#252B42] mb-3">Pricing FAQs</h2>
				<p className="text-gray-500 max-w-2xl mx-auto mb-12">
					Problems trying to resolve the conflict between the two major realms
					of Classical physics
				</p>

				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
					{Array(6)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="flex gap-3">
								<span className="text-blue-500 text-xl">›</span>
								<div>
									<h4 className="font-bold text-[#252B42] mb-1">
										the quick fox jumps over the lazy dog
									</h4>
									<p className="text-gray-500 text-sm">
										Met minim Mollie non desert Alamo est sit cliquey dolor do
										met sent. RELIT official consequent door ENIM RELIT Mollie.
										Excitation venial consequent sent nostrum met.
									</p>
								</div>
							</div>
						))}
				</div>
			</section>

			{/* Contact Support Section */}
			<section className="py-10 text-center">
				<p className="text-gray-500">
					Haven’t got your answer?{" "}
					<span className="text-blue-500 font-semibold cursor-pointer">
						Contact our support
					</span>
				</p>
			</section>

			{/* Free Trial Section */}
			<section className="py-10 text-center flex justify-center">
				<div className="max-w-[33%]">
					<h1 className="text-xl font-bold text-[#252B42] mb-4">
						Start your 14 days free trial
					</h1>
					<p className="text-sm text-[#252B42] mb-6">
						Net minim Mollie non desert Alamo est sit cliquey dolor do met sent.
						RELIT official consequent door ENIM RELIT Mollie.
					</p>
					<button className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm">
						Try it free now
					</button>
				</div>
			</section>
		</div>
	);
}
