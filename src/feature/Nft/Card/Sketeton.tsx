import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui";

export function Skeleton() {
	return (
		<Card className="flex flex-col justify-between h-full">
			<CardHeader>
				<CardTitle>
					<div className=" w-full h-6 animate-pulse bg-accent rounded-md" />
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<CardDescription className="flex gap-1">
					<div className=" w-full h-4 animate-pulse bg-card rounded-md" />
				</CardDescription>

				<CardDescription className="flex gap-1">
					<div className=" w-full h-4 animate-pulse bg-accent rounded-md" />
				</CardDescription>
				<CardDescription>
					<div className=" w-full h-4 animate-pulse bg-accent rounded-md" />
				</CardDescription>
				<CardDescription>
					<div className=" w-full h-4 animate-pulse bg-accent rounded-md" />
				</CardDescription>
			</CardContent>
			<CardFooter>
				<div className=" w-full h-46 animate-pulse bg-accent rounded-md" />
			</CardFooter>
		</Card>
	);
}
