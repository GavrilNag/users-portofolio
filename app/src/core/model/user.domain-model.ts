export namespace UserDomainModel {
  export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: Date;
  };

  export type State = {
    availableUsers: {
      data: UserDomainModel.User[];
      status: 'idle' | 'loading' | 'success' | 'error';
      error: string | null;
    };
  };
}
