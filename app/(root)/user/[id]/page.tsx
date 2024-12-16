import { auth } from "@/auth";
import { StartupCardSkleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_SANITY_ID_QUIRY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimential_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_SANITY_ID_QUIRY, { id });
  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.name}
            </h3>
          </div>
          <Image
            src={user?.image}
            alt={user?.nmae}
            height={220}
            width={220}
            className="profile_name"
          />
          <p className="text-30-extrabold mt-7 text-center">@{user?.name}</p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;