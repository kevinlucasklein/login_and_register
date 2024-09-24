import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../entities/User';
import { AuthService } from '../services/AuthService';
import { isAuth } from '../middleware/isAuth';

@Resolver(User)
export class UserResolver {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() context: any) {
    return this.authService.getCurrentUser(context.req.userId);
  }

  @Mutation(() => String)
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    return this.authService.login(email, password);
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('username') username: string
  ) {
    return this.authService.register(email, password, username);
  }
}