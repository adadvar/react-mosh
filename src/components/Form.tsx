import React, { useState } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
	description: z
		.string()
		.min(3, { message: "Description should be ad least 3 characters." }),
	amount: z.number({ invalid_type_error: "Amount is required." }),
	category: z.string({ required_error: "Category is required." }),
});

const catitem = ["Groceries", "Utilities", "Entertainment"];

type FormData = z.infer<typeof schema>;

const Form = () => {
	const [selectedCategory, setSelectedCategory] = useState("All category");
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						{...register("description")}
						id="description"
						type="text"
						className="form-control"
					/>
					{errors.description && (
						<p className="text-danger">{errors.description.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						{...register("amount", { valueAsNumber: true })}
						id="amount"
						type="number"
						className="form-control"
					/>
					{errors.amount && <p className="text-danger">{errors.amount.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select
						{...register("category")}
						defaultValue={""}
						id="category"
						className="form-select"
					>
						<option></option>
						{catitem.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>

			<div className="mb-3 mt-5">
				<select
					className="form-select"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="All category">All category</option>
					{catitem.map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default Form;
