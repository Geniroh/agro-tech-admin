export interface IUser {
  _id: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Media {
  name: string;
  url: string;
  size?: number;
  type?: string;
  uid?: string;
}

interface ProductExample {
  instance_description: string;
  instance_media: Media[];
}

interface ProductInstruction {
  instruction_step: string;
}

interface ProductInventor {
  inventor_name: string;
  inventor_email: string;
  inventor_contact: string;
}

interface ProductSupplier {
  supplier_name: string;
  supplier_email: string;
  supplier_contact: string;
}

interface ProductGuidelines {
  name: string;
}

interface IInnovationReaction {
  id: string;
  userId: string;
  innovationId: string;
  reaction: string;
  //eslint-disable-next-line
  User?: any;
  //eslint-disable-next-line
  Innovation?: any;
  createdAt: string;
  updatedAt: string;
}

export interface IInnovationType {
  id: string;
  productName: string;
  yearInvented: string;
  country: string;
  month: string;
  cost: number;
  likes: number;
  status?: string;
  dislikes: number;
  currency: string;
  reactions?: IInnovationReaction[];
  comments: IInnovationComment[];
  productChain: string[];
  productPhase: string;
  productUse: string;
  productDescription: string;
  productMedia: Media[];
  isExample: boolean;
  isHSEGuidelines: boolean;
  isInstruction: boolean;
  isInventor: boolean;
  isSupplier: boolean;
  productExample?: ProductExample[];
  productInstruction?: ProductInstruction[];
  productInventor: ProductInventor[];
  productSupplier: ProductSupplier[];
  productGuidelines?: ProductGuidelines[];
  isGenderFriendly?: boolean | null;
  productGenderDescription?: string | null;
  createdAt: string;
  updatedAt?: string;
  discussions: IInnovationDiscussion[];
}

interface IInnovationComment {
  createdAt?: string;
  dislikes: number;
  email: string;
  id: string;
  innovationDiscussionId: string;
  likes: number;
  message: string;
  //eslint-disable-next-line
  replies?: any | any[];
  topReply?: string;
  updatedAt?: Date;
  username: string;
}

export interface IInnovationCommentReply {
  commentId: string;
  createdAt: string;
  dislikes: number;
  id: string;
  likes: number;
  message: string;
  updatedAt: string;
  userId: string;
  User: IUser;
  Comment: IInnovationComment;
}

export interface IFeaturedPosts {
  _id: string;
  mediaUrl: string;
  title: string;
  tag: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IInnovationDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  innovation_id: string;
  likes: number;
  topComment: string;
  updatedAt: string;
  comments: IInnovationComment[];
  Innovation?: IInnovationType;
}

export interface ICombinedDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  innovation_id: string;
  likes: number;
  topComment: string;
  updatedAt: string;
  comments?: string[];
  message: string;
  title: string;
  userId: string;
  replies?: string[];
  user?: string;
  Innovation?: IInnovationType;
}

export interface IUserDetails {
  id: string;
  username: string;
  phone: string;
  occupation: string;
  userId: string;
  country: string;
  state?: string;
  lga?: string;
  address?: string;
  company_name?: string;
  position?: string;
  association?: string;
  user?: IUser;
}

export interface IGetInnovationDiscussionResponse {
  message: string;
  comments: IInnovationComment[];
  discussion: IInnovationDiscussion;
}

export interface IGetInnovationDisussionReplies {
  message: string;
  replies: IInnovationCommentReply[];
}

export interface IUserDiscussion {
  createdAt: string;
  dislikes: number;
  id: string;
  likes: number;
  message: string;
  replies: IUserDiscussionReply[];
  title: string;
  updatedAt: string;
  userId: string;
  user: IUser;
  comments: IUserDiscussionReply[];
}

interface IUserDiscussionReply {
  id: string;
  message: string;
  userId: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  discussionId: string;
  Discussion?: IUserDiscussion;
}
