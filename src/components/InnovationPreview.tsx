//eslint-disable-next-line
import { Button, Card, Collapse, Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api/api";
import { useState } from "react";
import { IInnovationType } from "../types";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { RenderMedia } from "./RenderMedia";

const InnovationPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IInnovationType>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getInnovationById = async (id: string) => {
    const { data: res } = await api.get<IInnovationType>(`/innovation/${id}`);
    console.log(res);
    return res;
  };

  const { refetch } = useQuery(
    ["get-innovation-by-id", id],
    () => getInnovationById(id!),
    {
      enabled: !!id, // Ensure the query only runs if id is defined
      keepPreviousData: true,
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  const updateInnovation = async (
    status: "approved" | "rejected" | "pending"
  ) => {
    const { data: res } = await api.patch<IInnovationType>(
      `/innovation/update/${id}`,
      { status }
    );
    return res;
  };

  const mutation = useMutation(updateInnovation, {
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["get-all-innovation"]);
    },
  });

  const handleUpdate = (status: "approved" | "rejected" | "pending") => {
    mutation.mutate(status);
  };

  return (
    <div>
      <Card>
        <div className="">
          <div className="w-full text-center capitalize font-bold">
            Status - {data?.status}
          </div>

          <div className="w-full flex justify-between items-center gap-4">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
              Back
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="small"
                type="primary"
                onClick={() => handleUpdate("approved")}
              >
                Approve
              </Button>
              <Button
                size="small"
                type="primary"
                className="bg-red-600"
                onClick={() => handleUpdate("rejected")}
              >
                Reject
              </Button>
            </div>
          </div>

          <div className="container">
            <div className="w-full">
              <div>
                <h1 className="w-full text-center text-4xl font-playfair font-semibold">
                  {data?.productName}
                </h1>
              </div>
              <div className="flex flex-wrap items-center justify-center max-w-[1200px] mt-7 text-sm tracking-wide mx-auto gap-y-2">
                <div className="flex">
                  <span className="text-muted-foreground mr-2">Inventor:</span>
                  <span className="flex gap-1 flex-wrap">
                    {data?.productInventor &&
                    data?.productInventor.length > 0 ? (
                      <>
                        {data?.productInventor.map((inventor, i) => (
                          <span key={i}>{inventor.inventor_name}</span>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="mx-4">|</div>
                <div>
                  <span className="text-muted-foreground mr-2">
                    Year Invented:
                  </span>
                  <span>{data?.yearInvented}</span>
                </div>
                <div className="mx-4 hidden md:block">|</div>
                <div>
                  <span className="text-muted-foreground mr-2">Country:</span>
                  <span>{data?.country}</span>
                </div>
                <div className="mx-4">|</div>
                <div>
                  <span className="text-muted-foreground mr-2">Cost:</span>
                  <span>
                    {data?.cost
                      ? data.currency + " " + data.cost
                      : "Not applicable"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">
                    Value Chain:
                  </span>
                  <span className="flex gap-x-2">
                    {data?.productChain.map((chain) => {
                      return (
                        <Tag className="text-[9px]">{chain.toUpperCase()}</Tag>
                      );
                    })}
                  </span>
                </div>
                <div className="mx-4 hidden md:block">|</div>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">
                    Implementation Phase:
                  </span>
                  <span className="flex gap-x-2">
                    <Tag>{data?.productPhase}</Tag>
                  </span>
                </div>
                <div className="mx-4 hidden md:block">|</div>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">Usage:</span>
                  <span className="flex gap-x-2">
                    {data?.productUse.split(",").map((use, index) => (
                      <Tag key={index}>{use}</Tag>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {data?.productMedia ? (
                  data.productMedia.map(
                    (media, i) =>
                      media.url && (
                        <RenderMedia
                          media={media}
                          key={i}
                          className="rounded-md h-[95px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
                        />
                        // <Image
                        //   src={media.url}
                        //   key={i}
                        //   className="rounded-md h-[95px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
                        // />
                      )
                  )
                ) : (
                  <div className="text-center text-muted-foreground">
                    --- No data ----
                  </div>
                )}
              </div>

              <div className="mt-10">
                <h2 className="text-2xl text-muted-foreground">Description</h2>
                <p className="leading-8">{data?.productDescription}</p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl text-muted-foreground mb-5">
                  Additional Info
                </h2>
                <Collapse
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "How to use",
                      children: (
                        <>
                          {data?.productInstruction ? (
                            <ul className="flex flex-col gap-4">
                              {data?.productInstruction.map((step, i) => (
                                <li key={i}>
                                  <span className="font-semibold">
                                    {" "}
                                    Step {i + 1}:{"  "}
                                  </span>
                                  {step.instruction_step}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-center text-muted-foreground">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                    {
                      key: "2",
                      label: "Contact Supplier",
                      children: (
                        <>
                          {data?.isSupplier ? (
                            <>
                              {data.productSupplier.map((supplier, i) => (
                                <div
                                  key={i}
                                  className="text-[14px] leading-[22px] mb-3"
                                >
                                  <h2 className="text-[#888888] text-[16px] mb-2">
                                    Contact {i + 1}
                                  </h2>
                                  <ul className="flex flex-col gap-2">
                                    <li>
                                      <span className="text-[#888888]">
                                        Name
                                      </span>{" "}
                                      {supplier.supplier_name}
                                    </li>
                                    <li>
                                      <span className="text-[#888888]">
                                        Email
                                      </span>{" "}
                                      {supplier.supplier_email}
                                    </li>
                                    <li>
                                      <span className="text-[#888888]">
                                        Phone
                                      </span>{" "}
                                      {supplier.supplier_contact}
                                    </li>
                                  </ul>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="text-center text-muted-foreground flex justify-center items-center">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                    {
                      key: "3",
                      label: "Contact Inventor",
                      children: (
                        <>
                          {data?.isInventor ? (
                            <>
                              {data.productInventor.map((inventor, i) => (
                                <div
                                  key={i}
                                  className="text-[14px] leading-[22px] mb-3"
                                >
                                  <h2 className="text-[#888888] text-[16px] mb-2">
                                    Contact {i + 1}
                                  </h2>
                                  <ul className="flex flex-col gap-2">
                                    <li>
                                      <span className="text-[#888888]">
                                        Name
                                      </span>{" "}
                                      {inventor.inventor_name}
                                    </li>
                                    <li>
                                      <span className="text-[#888888]">
                                        Email
                                      </span>{" "}
                                      {inventor.inventor_email}
                                    </li>
                                    <li>
                                      <span className="text-[#888888]">
                                        Phone
                                      </span>{" "}
                                      {inventor.inventor_contact}
                                    </li>
                                  </ul>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="text-center text-muted-foreground flex justify-center items-center">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                    {
                      key: "4",
                      label: "Usage Examples",
                      children: (
                        <>
                          {data?.isExample ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {data?.productExample?.map((example, i) => (
                                  <div key={i} className="text-center">
                                    <RenderMedia
                                      media={example.instance_media[0]}
                                      key={i}
                                      className="w-full max-w-[250px] mx-auto h-[220px] md:h-[250px] lg:h-[250px] object-cover"
                                    />
                                    {example.instance_description}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="text-center text-muted-foreground flex justify-center items-center">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                    {
                      key: "5",
                      label: "HSE Guideline",
                      children: (
                        <>
                          {data?.isHSEGuidelines ? (
                            <>
                              <ul>
                                {data?.productGuidelines?.map(
                                  (guideline, i) => (
                                    <li key={i}>{guideline.name}</li>
                                  )
                                )}
                              </ul>
                            </>
                          ) : (
                            <div className="text-center text-muted-foreground flex justify-center items-center">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                    {
                      key: "6",
                      label: (
                        <div className="flex gap-2 items-center">
                          <span>Gender Friendly</span>
                          {data?.isGenderFriendly ? (
                            <FaCheckCircle className="text-primary" />
                          ) : (
                            <FcCancel />
                          )}
                        </div>
                      ),
                      children: (
                        <>
                          {data?.isGenderFriendly ? (
                            <p>{data?.productGenderDescription}</p>
                          ) : (
                            <div className="text-center text-muted-foreground flex justify-center items-center">
                              --- No data ----
                            </div>
                          )}
                        </>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InnovationPreview;
