export namespace UserDomainModel {
  export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
  };

  export type State = {
    registerNewUser: {
      status: 'idle' | 'loading' | 'success' | 'error';
      error: string | null;
    };
    availableUsers: {
      data: UserDomainModel.User[];
      status: 'idle' | 'loading' | 'success' | 'error';
      error: string | null;
    };
  };
}
