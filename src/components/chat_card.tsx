import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

function ChatCard({
  card,
}: {
  card: {
    title: string;
    description: string;
    images: string[];
    link: string;
  };
}) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <img src={card.images[0]} alt={card.title} width={300} />
        <CardTitle>{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{card.description}</p>
      </CardContent>
      <CardFooter>
        <Button>
          <Link href={card.link}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChatCard;
