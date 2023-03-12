export interface Video {
  caption: string;
  video: {
    asset: {
      url: string;
      _id: string;
    };
  };
  _id: string;
  postedBy: {
    image: string;
    userName: string;
    _id: string;
  };
  likes: {
    postedBy: {
      image: string;
      userName: string;
      _id: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
      postedBy: {
      _ref: string;
    }
  }[];
  userId: string;
}
